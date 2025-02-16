"use client";

import { useState } from "react";
import {
  AppShell,
  Title,
  Group,
  ScrollArea,
  Badge,
  Text,
  Card,
  Space,
  ActionIcon,
  Menu,
  Modal,
  Button,
  TextInput,
} from "@mantine/core";
import { PiBrainDuotone } from "react-icons/pi";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchConversations,
  deleteConversation,
  createConversation,
} from "../../utils/api.js";
import { SlOptions } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Conversation() {
  const [opened, setOpened] = useState(false);
  const [newConversationOpened, setNewConversationOpened] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newConversationName, setNewConversationName] = useState("");

  const queryClient = useQueryClient();

  const {
    data: conversations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
      setOpened(false);
    },
  });

  const createMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
      setNewConversationOpened(false);
      setNewConversationName("");
    },
  });

  const handleDeleteClick = (conversationId) => {
    setSelectedConversation(conversationId);
    setOpened(true);
  };

  const handleConfirmDelete = () => {
    if (selectedConversation) {
      deleteMutation.mutate(selectedConversation);
    }
  };

  const handleCreateConversation = () => {
    if (newConversationName.trim()) {
      createMutation.mutate({
        name: newConversationName,
        model: "gpt-4o-mini",
        params: {},
      });
    }
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className="py-2 pl-2 ml-2">
        <Group spacing="xs">
          <PiBrainDuotone size={34} style={{ marginTop: "4px" }} />
          <Title>
            LLM.IO<span className="blinking-cursor">_</span>
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Card shadow="xs" padding="md" radius="md" withBorder>
          <Title
            order={1}
            style={{ fontSize: 24, fontWeight: 900, marginBottom: "0.5em" }}
          >
            All Conversations
          </Title>
          <ScrollArea style={{ maxHeight: "60vh" }}>
            {isLoading && <Text>Loading...</Text>}
            {error && (
              <Text color="red">An error occurred: {error.message}</Text>
            )}
            {conversations && conversations.length > 0
              ? conversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    withBorder
                    radius="md"
                    p="md"
                    mb="sm"
                  >
                    <Group position="apart" mb="xs" gap="xs" align="center">
                      <Group>
                        <Text
                          fw={500}
                          size="lg"
                          component={Link}
                          href={`/conversations/${conversation._id}`}
                        >
                          {conversation.name}
                        </Text>
                        <Badge color="green" variant="light">
                          GPT-4o-mini
                        </Badge>
                      </Group>
                      <Space style={{ flexGrow: 1 }} />
                      <Menu withArrow position="bottom-end" shadow="md">
                        <Menu.Target>
                          <ActionIcon color="black" variant="transparent">
                            <SlOptions size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>Options</Menu.Label>
                          <Menu.Item
                            leftSection={<FaRegTrashAlt size={14} />}
                            color="red"
                            onClick={() => handleDeleteClick(conversation._id)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                    <Text size="sm" color="dimmed">
                      Tokens: {conversation.tokens}
                    </Text>
                    <Text size="sm" color="dimmed">
                      Total Number of Messages: {conversation.messages.length}
                    </Text>
                  </Card>
                ))
              : !isLoading &&
                !error && <Text mb="md">No conversations available.</Text>}
            <Button
              variant="light"
              color="green"
              size="lg"
              fullWidth
              onClick={() => setNewConversationOpened(true)}
            >
              <Text align="center" color="green">
                Add a new conversation
              </Text>
            </Button>
          </ScrollArea>
        </Card>
      </AppShell.Main>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Delete"
        radius="md"
        centered
      >
        <Text>Are you sure you want to delete this conversation?</Text>
        <Group position="apart" mt="md">
          <Button
            variant="default"
            color="black"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={newConversationOpened}
        onClose={() => setNewConversationOpened(false)}
        title="Create New Conversation"
        radius="md"
        centered
      >
        <Text size="sm" fw={500}>
          Conversation Name
        </Text>
        <TextInput
          placeholder="Conversation Name"
          value={newConversationName}
          onChange={(event) =>
            setNewConversationName(event.currentTarget.value)
          }
          mb="sm"
        />
        <Text size="sm" mt="sm" fw={500}>
          Model
        </Text>
        <TextInput placeholder="GPT-3" mb="sm" disabled />
        <Text size="sm" mt="sm" fw={500}>
          Parameters
        </Text>
        <TextInput placeholder="Default Parameters" mb="sm" disabled />
        <Group position="apart" mt="lg">
          <Button
            variant="default"
            color="black"
            onClick={() => setNewConversationOpened(false)}
          >
            Cancel
          </Button>
          <Button
            color="green"
            onClick={handleCreateConversation}
            disabled={!newConversationName.trim()}
          >
            Create
          </Button>
        </Group>
      </Modal>
    </AppShell>
  );
}
