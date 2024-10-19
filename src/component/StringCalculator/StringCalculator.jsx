import React, { useState } from 'react';

function StringCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const add = (numbers) => {
    // Return 0 for an empty string
    if (!numbers) {
      return 0;
    }

    // Default delimiters: commas and new lines
    const delimiters = [',', '\n'];
    // Check if there's a custom delimiter at the start
    if (numbers.startsWith('//')) {
      const [delimiterSection, numberString] = numbers.split('\n', 2);
      const customDelimiter = delimiterSection.substring(2);  // Extract custom delimiter
      delimiters.push(customDelimiter);
      numbers = numberString;  // Remaining numbers part
    }

    // Create a regular expression pattern to split by multiple delimiters
    const pattern = new RegExp(`[${delimiters.join('')}]`);

    // Split the numbers string based on the delimiters
    const numberList = numbers.split(pattern);

    // Convert strings to integers and handle negatives
    let total = 0;
    const negatives = [];
    for (let num of numberList) {
      if (num) {
        const number = parseInt(num, 10);
        if (number < 0) {
          negatives.push(number);
        }
        total += number;
      }
    }

    // If there are negative numbers, throw an exception
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return total;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setError('');
      const sum = add(input);
      setResult(sum);
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Numbers:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 1,2 or //;\n1;2"
          />
        </label>
        <button type="submit">Calculate</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result !== null && !error && <p>Result: {result}</p>}
    </div>
  );
}

export default StringCalculator;
