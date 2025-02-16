"use client";

import { useState, useEffect } from "react";
import {
  AppShell,
  Title,
  Group,
  Card,
  Grid,
  TextInput,
  Button,
  ScrollArea,
  Text,
  Slider,
  Select,
  ActionIcon,
} from "@mantine/core";
import { PiBrainDuotone } from "react-icons/pi";
import { useParams } from "next/navigation";
import { fetchConversationById, sendPrompt } from "../../../utils/api.js"; // Import sendPrompt function
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ConversationPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { role: "system", content: "Hello! How can I assist you today?" },
  ]);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (id) {
      console.log(fetchConversationById(id));
      fetchConversationById(id)
        .then((data) => setConversation(data.messages))
        .catch((error) =>
          console.error("Failed to fetch conversation:", error)
        );
      fetchConversationById(id)
        .then((data) => setName(data.name))
        .catch((error) =>
          console.error("Failed to fetch conversation:", error)
        );
    }
  }, [id]);

  const handleSendMessage = async () => {
    console.log("Sending message:", message);
    if (message.trim()) {
      setConversation([...conversation, { role: "user", content: message }]);
      setMessage("");
      setIsLoading(true);

      try {
        const promptData = {
          role: "user",
          content: message,
        };

        await sendPrompt({ conversationId: id, promptData });

        setConversation((prevConversation) => [
          ...prevConversation,
          { role: "system", content: "[Response from LLM.]" },
        ]);
      } catch (error) {
        console.error("Failed to send prompt:", error);
      } finally {
        setIsLoading(false);
      }
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
        <Group mb="md">
          <ActionIcon
            onClick={() => window.history.back()}
            variant="transparent"
            color="black"
          >
            <IoMdArrowRoundBack size={24} />
          </ActionIcon>
          <Title order={1} style={{ fontSize: 24, fontWeight: 800 }}>
            {name}
          </Title>
        </Group>

        <Grid gutter="md">
          <Grid.Col span={2}>
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title
                order={2}
                style={{ fontSize: 20, fontWeight: 700, marginBottom: "1em" }}
              >
                LLM Properties
              </Title>
              <Select
                label="Model Type"
                placeholder="Select model"
                data={["GPT-4o-mini", "GPT-3.5-turbo", "GPT-3", "GPT-4", "GPT-4o"]}
                defaultValue="GPT-4o-mini"
                mb="sm"
              />
              <Text size="sm" mt="sm" fw={500}>
                Temperature
              </Text>
              <Slider
                value={temperature}
                onChange={setTemperature}
                min={0}
                max={1}
                step={0.1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 1, label: "1" },
                ]}
                mb="lg"
                color="green"
              />
              <Text
                size="sm"
                mt="sm"
                fw={500}
                style={{ marginBottom: "0.3em" }}
              >
                Stop Sequence
              </Text>
              <TextInput placeholder="Stop sequence" mb="xs" />
              <Text size="sm" mt="sm" fw={500}>
                Top P
              </Text>
              <Slider
                value={topP}
                onChange={setTopP}
                min={0}
                max={1}
                step={0.1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 1, label: "1" },
                ]}
                mb="xl"
                color="green"
              />
              <Button variant="filled" color="green" fullWidth>
                Update
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col span={10}>
            <Card shadow="xs" padding="md" radius="md" withBorder>
              <Title
                order={2}
                style={{ fontSize: 20, fontWeight: 700, marginBottom: "1em" }}
              >
                Chat
              </Title>
              <ScrollArea
                style={{
                  height: "60vh",
                  marginBottom: "1em",
                  paddingRight: "1em",
                }}
              >
                {conversation.map((msg, index) => (
                  <Text
                    key={index}
                    align={msg.role === "user" ? "right" : "left"}
                    mb="xs"
                  >
                    <strong>{msg.role === "user" ? "User" : "LLM"}:</strong>{" "}
                    {msg.content}
                  </Text>
                ))}
              </ScrollArea>
              <Group>
                <TextInput
                  placeholder="Type a message"
                  value={message}
                  onChange={(event) => setMessage(event.currentTarget.value)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && handleSendMessage()
                  }
                  style={{ flex: 1 }}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  color="green"
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
