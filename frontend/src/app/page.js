"use client";

import {
  Button,
  Container,
  Group,
  Text,
  Title,
  Image,
  Grid,
} from "@mantine/core";
import Link from "next/link";

export default function Home() {
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
          <Image
            src="/globe.svg"
            alt="LLM.IO"
            radius="md"
            style={{ maxWidth: "100%" }}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
