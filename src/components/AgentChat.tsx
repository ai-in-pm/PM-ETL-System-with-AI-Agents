import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, User, Database, Network, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Message {
  id: number;
  type: 'user' | 'agent';
  content: string;
  agent?: string;
  sources?: string[];
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'agent',
      content: 'Hello! I\'m your ETL Assistant with RAG capabilities. How can I help you with your data today?',
      agent: 'ETL Assistant'
    }
  ]);
  const [input, setInput] = useState('');
  const [retrievalMethod, setRetrievalMethod] = useState('hybrid');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate agent response with RAG
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        type: 'agent',
        content: 'Based on the retrieved context from our vector store and knowledge graph, I can help you with that.',
        agent: 'RAG-Enhanced Agent',
        sources: [
          'Vector DB: Document #123',
          'Knowledge Graph: Node #456',
          'Related Entities: Project Management, ETL Processes'
        ]
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle>RAG-Enhanced Agent Chat</CardTitle>
          </div>
          <Select value={retrievalMethod} onValueChange={setRetrievalMethod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select retrieval method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vector">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Vector Search
                </div>
              </SelectItem>
              <SelectItem value="graph">
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Graph RAG
                </div>
              </SelectItem>
              <SelectItem value="hybrid">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  Hybrid Retrieval
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 p-4 rounded-lg",
                  message.type === 'user'
                    ? "ml-auto bg-primary text-primary-foreground max-w-[80%]"
                    : "mr-auto bg-muted max-w-[80%]"
                )}
              >
                {message.type === 'user' ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
                <div className="space-y-2">
                  {message.agent && (
                    <div className="text-xs font-medium">{message.agent}</div>
                  )}
                  <div>{message.content}</div>
                  {message.sources && (
                    <div className="text-xs space-y-1 mt-2 opacity-80">
                      <div className="font-medium">Sources:</div>
                      {message.sources.map((source, index) => (
                        <div key={index} className="ml-2">• {source}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Ask about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}