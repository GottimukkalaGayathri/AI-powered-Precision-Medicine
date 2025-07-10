function RiskIndicator({ level }) {
  const getLevelClass = () => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'risk-low';
      case 'medium':
        return 'risk-medium';
      case 'high':
        return 'risk-high';
      default:
        return 'risk-low';
    }
  };

  return (
    <span className={`risk-indicator ${getLevelClass()}`}>
      {level}
    </span>
  );
}

export default RiskIndicator;