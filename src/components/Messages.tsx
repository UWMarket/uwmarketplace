import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    lastMessage: "Hi, is this item still available?",
    timestamp: "2023-06-15T14:30:00",
    unread: true,
    itemTitle: "Calculus Textbook",
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    lastMessage: "Would you take $40 for it?",
    timestamp: "2023-06-14T09:15:00",
    unread: false,
    itemTitle: "Desk Lamp",
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    lastMessage: "Thanks for the quick response!",
    timestamp: "2023-06-13T16:45:00",
    unread: false,
    itemTitle: "Wireless Headphones",
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: "msg1",
    senderId: "user1",
    text: "Hi, is this item still available?",
    timestamp: "2023-06-15T14:30:00",
  },
  {
    id: "msg2",
    senderId: "currentUser",
    text: "Yes, it's still available!",
    timestamp: "2023-06-15T14:35:00",
  },
  {
    id: "msg3",
    senderId: "user1",
    text: "Great! I'm interested in buying it. Would you be willing to meet on campus tomorrow?",
    timestamp: "2023-06-15T14:40:00",
  },
  {
    id: "msg4",
    senderId: "currentUser",
    text: "Sure, I can meet tomorrow. How about 3pm at the SLC?",
    timestamp: "2023-06-15T14:45:00",
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [messageText, setMessageText] = useState("");

  // Find the active conversation details
  const currentConversation = mockConversations.find(
    (conv) => conv.id === activeConversation,
  );

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    // In a real app, this would send the message to the backend
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar isAuthenticated={true} />

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <Card className="flex-1 overflow-hidden">
          <div className="grid md:grid-cols-[300px_1fr] h-[600px]">
            {/* Conversations List */}
            <div
              className={`border-r ${activeConversation ? "hidden md:block" : ""}`}
            >
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(600px-60px)]">
                <div className="px-4 py-2">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        conversation.id === activeConversation
                          ? "bg-accent"
                          : "hover:bg-muted"
                      } ${conversation.unread ? "font-medium" : ""}`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>
                          {conversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {conversation.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(conversation.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Re: {conversation.itemTitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Message View */}
            {activeConversation ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setActiveConversation(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarImage src={currentConversation?.user.avatar} />
                    <AvatarFallback>
                      {currentConversation?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {currentConversation?.user.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Re: {currentConversation?.itemTitle}
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "currentUser" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-lg ${
                            message.senderId === "currentUser"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div>{message.text}</div>
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {new Date(message.timestamp).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-[80px]"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      className="self-end"
                      onClick={handleSendMessage}
                      disabled={messageText.trim() === ""}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
