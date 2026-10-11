export function Starfield() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-haze" />
      <div className="sky-stars sky-far" />
      <div className="sky-stars sky-mid" />
      <div className="sky-stars sky-near" />
      {/* Metal shards: a scroll-parallax wrapper around a layer that drifts on its own. */}
      <div className="shard-scroll"><div className="shards shards-dust" /></div>
      <div className="shard-scroll shard-scroll-near"><div className="shards shards-glint" /></div>
    </div>
  );
}
