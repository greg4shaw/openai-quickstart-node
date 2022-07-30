import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import React from "react";

var responses = [];

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    if(result !== undefined) {responses.push(`Me: ${result}`)};
    responses.push(`You: ${animalInput}`);
    console.log(responses);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>SmartAsk</title>
        <link rel="icon" href="/eyes.png" />
      </Head>

      <main className={styles.main}>
        <img src="/eyes.png" className={styles.icon} />
        <h3>Ask me a question</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Ask anything. Seriously, anything..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Get a great answer" />
        </form>
        <div className={styles.result}>{result}</div>
        <div></div>
        <h5 className={styles.historyHead}>Chat history:</h5>
        <div className={styles.history}>
          {responses.map((response, index) => (
            <div key={index}>{response}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
