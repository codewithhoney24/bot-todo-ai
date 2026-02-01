import asyncio
from mcp import Server
from tools.finance import create_mcp_tools


def main():
    server = Server("finance-todo-chatbot-mcp")
    
    # Add all finance-related tools
    finance_tools = create_mcp_tools()
    for tool in finance_tools:
        server.add_tool(tool)
    
    # Run the server
    server.run()


if __name__ == "__main__":
    main()