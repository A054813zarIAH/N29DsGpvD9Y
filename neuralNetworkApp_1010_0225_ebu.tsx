// 代码生成时间: 2025-10-10 02:25:34
 * It includes a simple neural network model and a React component to interact with the model.
 */

import React, { useState } from 'react';

// Define a simple neural network model with one input, one hidden, and one output layer.
class SimpleNeuralNetwork {
  private weights1: number[];
  private weights2: number[];
  private bias1: number;
  private bias2: number;

  constructor() {
    this.weights1 = [Math.random() - 0.5, Math.random() - 0.5];
    this.weights2 = [Math.random() - 0.5, Math.random() - 0.5];
    this.bias1 = Math.random() - 0.5;
    this.bias2 = Math.random() - 0.5;
  }

  // Sigmoid activation function.
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  // Derivative of the sigmoid function.
  private sigmoidDerivative(x: number): number {
    return x * (1 - x);
  }

  // Forward propagate input through the network.
  public forward(input: number): number {
    let layer1 = input * this.weights1[0] + this.bias1;
    let layer2 = this.sigmoid(layer1) * this.weights2[0] + this.bias2;
    return this.sigmoid(layer2);
  }

  // Train the network using one input and expected output.
  public train(input: number, expected: number, learningRate: number): void {
    let output = this.forward(input);
    let outputError = expected - output;
    let outputDelta = outputError * this.sigmoidDerivative(output);

    let layer2Error = outputDelta;
    let layer1Error = layer2Error * this.weights2[0] * this.sigmoidDerivative(this.sigmoid(input * this.weights1[0] + this.bias1));

    this.weights2[0] += learningRate * layer2Error * output;
    this.weights1[0] += learningRate * layer1Error * input;
    this.bias2 += learningRate * layer2Error;
    this.bias1 += learningRate * layer1Error;
  }
}

const NeuralNetworkApp: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [expectedValue, setExpectedValue] = useState(1);
  const [learningRate, setLearningRate] = useState(0.1);
  const [network, setNetwork] = useState(new SimpleNeuralNetwork());
  const [error, setError] = useState(0);
  const [epoch, setEpoch] = useState(0);

  // Train the neural network for a single epoch.
  const trainNetwork = (): void => {
    const output = network.forward(inputValue);
    const error = expectedValue - output;
    setError(error);
    network.train(inputValue, expectedValue, learningRate);
    setEpoch(epoch + 1);
  };

  return (
    <div>
      <h1>Simple Neural Network Simulation</h1>
      <div>
        <label>Input Value: </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Expected Output: </label>
        <input
          type="number"
          value={expectedValue}
          onChange={(e) => setExpectedValue(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Learning Rate: </label>
        <input
          type="number"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <button onClick={trainNetwork}>Train</button>
      </div>
      <div>
        <p>Error: {error}</p>
        <p>Epoch: {epoch}</p>
      </div>
    </div>
  );
};

export default NeuralNetworkApp;