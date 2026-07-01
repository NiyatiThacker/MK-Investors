from typing import List

# Mock Knowledge Base (Company FAQs)
COMPANY_KNOWLEDGE = [
    {"q": "What is MK Investors? Who are you?", "a": "I am MK, a certified financial advisor operating as MK Investors. I offer comprehensive wealth management, mutual funds, SIPs, portfolio management, and financial education to help you compound and protect your wealth."},
    {"q": "What services do you provide? What do you do?", "a": "I offer Financial Planning, Retirement Planning, Investment Management, Mutual Fund & SIP Advisory, Tax Planning, Corporate & Retail Loans, Insurance Solutions, NRI Investment Services, Portfolio Review & Rebalancing, and Estate Planning."},
    {"q": "How can I contact support or get in touch?", "a": "You can reach me directly via phone at 9824596906, email at manthankakkad50@gmail.com, or visit my office at Murlidhar marketing, bhavani mandir road, main bazar, madhavpur-362230. You can also submit the form on my Contact Page (/contact)."},
    {"q": "Do you provide loans or insurance?", "a": "Yes, I provide Corporate & Retail Loans as well as comprehensive Insurance Solutions."},
    {"q": "What tools or calculators do you offer?", "a": "I offer Financial Calculators including an Investment Calculator and a Mutual Fund Calculator to help you plan your wealth."}
]

def search_company_knowledge(query: str) -> str:
    """
    A simple mock RAG implementation.
    In a real app, this would embed the query and search a Vector Database.
    """
    query_lower = query.lower()
    relevant_context = []
    
    for item in COMPANY_KNOWLEDGE:
        # Simple keyword matching
        if any(word in query_lower for word in item["q"].lower().split()):
            relevant_context.append(f"Q: {item['q']}\nA: {item['a']}")
            
    if not relevant_context:
        return "No specific company information found for this query."
        
    return "\n\n".join(relevant_context)
