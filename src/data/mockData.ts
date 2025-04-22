
// Mock Video Lessons data
export const videoCategories = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Get started with the Forex trading strategy basics",
    videos: [
      {
        id: "intro-1",
        title: "Welcome to Only Pips Academy",
        description: "An introduction to our Forex trading strategy",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "intro-2",
        title: "How to Use This Platform",
        description: "Navigate and track your progress through the courses",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  },
  {
    id: "psychology",
    title: "Market Psychology",
    description: "Understanding trader psychology and market sentiment",
    videos: [
      {
        id: "psych-1",
        title: "Understanding Market Sentiment",
        description: "How trader sentiment affects price movement",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "psych-2",
        title: "Controlling Your Emotions",
        description: "Techniques to master your trading psychology",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "psych-3",
        title: "Identifying Market Psychology Patterns",
        description: "Recognize psychological patterns in price action",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  },
  {
    id: "volume",
    title: "Volume Concepts",
    description: "Learn how to analyze trading volume and its significance",
    videos: [
      {
        id: "vol-1",
        title: "Introduction to Volume Analysis",
        description: "Why volume is crucial to trading success",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "vol-2",
        title: "Volume Spread Analysis",
        description: "How to interpret volume spread patterns",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "vol-3",
        title: "Volume Confirmation Techniques",
        description: "Using volume to confirm price movements",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  },
  {
    id: "examples",
    title: "Strategy Examples",
    description: "Real-world examples of our strategy in action",
    videos: [
      {
        id: "ex-1",
        title: "EUR/USD Daily Analysis",
        description: "Applying the strategy to the most traded pair",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "ex-2",
        title: "GBP/JPY Volatility Strategy",
        description: "Handling high volatility pairs",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "ex-3",
        title: "Gold Market Analysis",
        description: "Strategy implementation for gold trading",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  },
  {
    id: "recap",
    title: "Recap",
    description: "Review and consolidate what you've learned",
    videos: [
      {
        id: "recap-1",
        title: "Strategy Framework Overview",
        description: "A complete review of the trading framework",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
      {
        id: "recap-2",
        title: "Common Mistakes to Avoid",
        description: "Pitfalls that new traders encounter",
        youtubeUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      },
    ],
  },
];

// Mock Strategy Breakdown data
export const strategyBreakdownSections = [
  {
    id: "volume-dynamics",
    title: "Volume Dynamics",
    content: `
      <h3>Understanding Volume in Forex</h3>
      <p>Volume represents the total amount of trading activity for a particular currency pair over a specific period. In the Forex market, true volume is difficult to measure due to its decentralized nature, but we can use tick volume as a reliable proxy.</p>
      
      <h3>Key Volume Principles</h3>
      <ul>
        <li>Volume typically leads price action</li>
        <li>Increasing volume during a trend confirms the trend's strength</li>
        <li>Decreasing volume during a trend suggests potential reversal</li>
        <li>Volume spikes often mark significant market events or turning points</li>
      </ul>
      
      <h3>Volume Analysis Techniques</h3>
      <p>Our strategy emphasizes several volume analysis techniques:</p>
      <ul>
        <li>Relative volume comparison</li>
        <li>Volume divergence identification</li>
        <li>Climax volume recognition</li>
        <li>Volume-at-price analysis</li>
      </ul>
    `,
  },
  {
    id: "market-conditions",
    title: "Market Conditions",
    content: `
      <h3>Identifying Market Environments</h3>
      <p>The market can operate in three primary conditions:</p>
      <ul>
        <li>Trending markets (directional movement)</li>
        <li>Ranging markets (bounded movement)</li>
        <li>Transitional markets (changing character)</li>
      </ul>
      
      <h3>Market Condition Indicators</h3>
      <p>We use several tools to identify current market conditions:</p>
      <ul>
        <li>Average Directional Index (ADX) for trend strength</li>
        <li>Bollinger Bands for volatility and range identification</li>
        <li>Market structure analysis (higher highs/lows or lower highs/lows)</li>
      </ul>
      
      <h3>Adapting to Market Conditions</h3>
      <p>Our strategy adjusts based on the current market environment:</p>
      <ul>
        <li>In trending markets: Focus on continuation patterns and pullback entries</li>
        <li>In ranging markets: Look for reversals at range boundaries</li>
        <li>In transitional markets: Reduce position size and focus on shorter timeframes</li>
      </ul>
    `,
  },
  {
    id: "entry-exit",
    title: "Entry/Exit Rules",
    content: `
      <h3>Entry Criteria</h3>
      <p>Our strategy employs specific entry rules based on multiple confirmations:</p>
      <ul>
        <li>Price action pattern confirmation (e.g., engulfing patterns, pin bars)</li>
        <li>Volume confirmation (increasing volume in the direction of the trade)</li>
        <li>Market structure alignment (trading with the prevailing trend)</li>
        <li>Key level interaction (support, resistance, supply, demand zones)</li>
      </ul>
      
      <h3>Exit Strategies</h3>
      <p>Proper exit management is crucial for profitability:</p>
      <ul>
        <li>Profit targets: Set based on previous market structure and key levels</li>
        <li>Stop losses: Placed beyond logical invalidation points</li>
        <li>Trailing stops: Implemented after trades move in your favor</li>
        <li>Time-based exits: Closing trades that don't perform within a specific timeframe</li>
      </ul>
      
      <h3>Position Sizing</h3>
      <p>Effective position sizing is determined by:</p>
      <ul>
        <li>Account risk percentage (typically 1-2% per trade)</li>
        <li>Trade setup quality (stronger setups may warrant larger positions)</li>
        <li>Market volatility (reduce size in highly volatile conditions)</li>
      </ul>
    `,
  },
  {
    id: "risk-management",
    title: "Risk Management",
    content: `
      <h3>Risk Management Principles</h3>
      <p>Consistent risk management is the foundation of trading success:</p>
      <ul>
        <li>Never risk more than 1-2% of your trading capital on any single trade</li>
        <li>Maintain a minimum risk-to-reward ratio of 1:2</li>
        <li>Track your maximum drawdown and adjust position sizing accordingly</li>
        <li>Implement a circuit breaker rule (stop trading after consecutive losses)</li>
      </ul>
      
      <h3>Calculating Position Size</h3>
      <p>To determine the proper position size:</p>
      <ol>
        <li>Calculate the dollar amount you're willing to risk (account balance × risk percentage)</li>
        <li>Determine your stop loss in pips</li>
        <li>Calculate position size: Risk amount ÷ (Stop loss in pips × Pip value)</li>
      </ol>
      
      <h3>Risk Management Tools</h3>
      <p>Leverage these tools to maintain consistent risk management:</p>
      <ul>
        <li>Trading journal to track performance and risk metrics</li>
        <li>Position size calculator for accurate sizing</li>
        <li>Equity curve tracking to monitor overall performance</li>
        <li>Drawdown alerts to notify you when to reduce position size</li>
      </ul>
    `,
  },
];

// Mock Cheat Sheet data
export const cheatSheets = [
  {
    id: "volume-cheat-sheet",
    title: "Volume Analysis Cheat Sheet",
    description: "Quick reference guide for volume analysis techniques",
    pdfUrl: "/cheatsheets/volume-analysis.pdf", // These would need to be created
  },
  {
    id: "entry-exit-cheat-sheet",
    title: "Entry & Exit Strategies",
    description: "Comprehensive guide to entry and exit techniques",
    pdfUrl: "/cheatsheets/entry-exit.pdf",
  },
  {
    id: "risk-management-cheat-sheet",
    title: "Risk Management Framework",
    description: "Essential risk management practices and calculations",
    pdfUrl: "/cheatsheets/risk-management.pdf",
  },
];
