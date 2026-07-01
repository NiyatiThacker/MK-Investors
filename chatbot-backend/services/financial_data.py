import yfinance as yf
from typing import Dict, Any

def get_stock_price(ticker_symbol: str) -> Dict[str, Any]:
    """
    Fetches the current stock price and basic info using yfinance.
    """
    try:
        ticker = yf.Ticker(ticker_symbol)
        data = ticker.fast_info
        
        return {
            "symbol": ticker_symbol,
            "current_price": round(data.last_price, 2),
            "currency": data.currency,
            "previous_close": round(data.previous_close, 2)
        }
    except Exception as e:
        return {"error": f"Could not fetch data for {ticker_symbol}. {str(e)}"}
