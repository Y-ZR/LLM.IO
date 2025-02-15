import { Navbar, ScrollArea, Button, List, ListItem } from "@mantine/core";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchConversations, createConversation } from "../utils/api.js";
import { useState } from "react";

export default function Sidebar() {
  const queryClient = useQueryClient();
  const {
    data: conversations,
    error,
    isLoading,
  } = useQuery(["conversations"], fetchConversations);
  const createMutation = useMutation(createConversation, {
    onSuccess: () => queryClient.invalidateQueries(["conversations"]),
  });

  const [newConversationName, setNewConversationName] = useState("");

  const handleCreateConversation = () => {
    createMutation.mutate({
      name: newConversationName,
      model: "gpt-4o-mini",
      params: {},
    });
    setNewConversationName("");
  };

  return (
    <Navbar padding="xs" width={{ base: 300 }}>
      <Button fullWidth onClick={handleCreateConversation}>
        New Conversation
      </Button>
      <ScrollArea style={{ height: "calc(100vh - 60px)" }} mx="-xs">
        <List>
          {conversations?.map((conversation) => (
            <ListItem key={conversation.id}>{conversation.name}</ListItem>
          ))}
        </List>
      </ScrollArea>
    </Navbar>
  );
}
