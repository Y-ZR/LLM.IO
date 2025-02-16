"use client";

import { Button, Container, Group, Text, Title, Grid } from "@mantine/core";
import Link from "next/link";
import { TypingAnimation } from "../components/typing-animations";

export default function Home() {
  const prompts = [
    "Explain the theory of relativity in simple terms.",
    "What are the implications of artificial general intelligence?",
    "How does photosynthesis work at a molecular level?",
    "Explain the concept of blockchain and cryptocurrency.",
    "What causes black holes and how do they work?",
    "How does the human immune system fight disease?",
    "What is dark matter and why is it important?",
    "Explain how neural networks learn and evolve.",
    "How do quantum computers differ from classical computers?",
    "What are the leading theories about consciousness?",
    "How does genetic engineering and CRISPR work?",
    "What causes climate change and its global effects?",
    "How do vaccines train our immune system?",
    "Explain string theory and its significance.",
    "How do self-driving cars perceive their environment?",
    "What is the future of space exploration?",
    "How does the internet actually work?",
  ];

  return (
    <Container
      size="lg"
      py="xl"
      className="flex flex-col items-center justify-center h-screen"
    >
      <Grid align="center">
        <Grid.Col span={6}>
          <Title order={1} style={{ fontSize: 54, fontWeight: 900 }}>
            Welcome to
          </Title>
          <Title
            order={2}
            style={{ fontSize: 54, fontWeight: 900, marginTop: "0.001em" }}
          >
            LLM.IO<span className="blinking-cursor">_</span>
          </Title>

          <Text size="lg" mt="md">
            Experience seamless integration with our powerful Language Learning
            Model. Manage conversations with ease and efficiency.
          </Text>
          <Group mt="xl">
            <Link href="/conversations">
              <Button size="lg" variant="filled" color="black">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" color="black">
              Learn More
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <div
            className="flex flex-col justify-center w-full h-full lg:max-w-xl mx-auto overflow-hidden rounded-xl bg-black p-8"
            style={{ height: "320px" }}
          >
            <div className="text-white min-h-full flex items-center">
              <TypingAnimation prompts={prompts} />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
