export function LoadingState() {
  return (
    <div className="loading-state" aria-busy="true" aria-live="polite">
      <div className="loading-card">
        <span className="loading-line loading-line--sm" />
        <span className="loading-line loading-line--lg" />
        <span className="loading-line loading-line--md" />
      </div>
      <div className="loading-card loading-card--soft">
        <span className="loading-line loading-line--sm" />
        <span className="loading-line loading-line--md" />
        <span className="loading-line loading-line--lg" />
      </div>
    </div>
  );
}
