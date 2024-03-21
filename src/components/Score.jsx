function Score({ score, highScore }) {
  return (
    <div className="score">
      <p>High score: {highScore}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default Score;
