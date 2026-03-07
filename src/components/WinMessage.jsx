export const WinMessage = ({ moves }) => {
  return (
    <div className="win-message">
      <h2>Congratulations!</h2>
      <p>You Completed The Game In {moves} moves</p>
    </div>
  );
};
