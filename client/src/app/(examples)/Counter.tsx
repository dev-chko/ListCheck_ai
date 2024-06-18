'use client';
import React from 'react';
import { useCounterStore } from '../stores/counterStore';

const Counter = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
