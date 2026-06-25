const Loader = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px'}}>
      <div style={{
        animation: 'spin 1s linear infinite',
        borderRadius: '50%',
        height: '48px',
        width: '48px',
        borderBottom: '2px solid var(--accent)'
      }}></div>
    </div>
  );
};

export default Loader;