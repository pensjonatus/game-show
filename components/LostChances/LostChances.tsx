export default function LostChances({ howMany }) {
  return (
    <>
      {[...new Array(howMany)].map((lostChance) => (
        <span key={lostChance}>😒</span>
      ))}
    </>
  );
}
