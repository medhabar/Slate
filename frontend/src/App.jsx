import React, { useEffect, useState } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import prism from "prismjs"
import axios from 'axios';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

const App = () => {

    const [code, setCode] = useState(`
        function sum() {
            return 1 + 1;
        }
    `);

    const [review, SetReview] = useState(``)

    useEffect(() => {
        prism.highlightAll()
    })

    async function reviewCode() {
        if (!code.trim()) {
        alert("Please enter a code snippet before reviewing.");
        return;
        }

        try {
            const response = await axios.post('http://localhost:3000/ai/get-review', { code });
            SetReview(response.data);
        } catch (error) {
            console.error("Error reviewing code:", error);
            alert("Failed to review code. Please try again.");
        }
        
    }

    return (
        <div>
            <main>
                <div className="left">
                    <div className="code">
                        <Editor 
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 16,
                                height: "100%",
                                width: "100%",
                            }}
                        />
                    </div>

                    <div 
                    onClick={reviewCode}
                        className="review-btn"
                    ><p>Review</p></div>
                </div>


                <div className="right">
                    <Markdown
  key={crypto.randomUUID()}
  rehypePlugins={[rehypeHighlight]}
>
  {review}
</Markdown>
                </div>
            </main>
        </div>
    )
}

export default App