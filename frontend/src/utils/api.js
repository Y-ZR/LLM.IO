import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Fetch all conversations
export const fetchConversations = async () => {
  const { data } = await api.get("/conversations");
  return data;
};

// Fetch a specific conversation by ID
export const fetchConversationById = async (id) => {
  const { data } = await api.get(`/conversations/${id}`);
  return data;
};

// Create a new conversation
export const createConversation = async (conversationData) => {
  const { data } = await api.post("/conversations/", conversationData);
  return data;
};

// Update an existing conversation
export const updateConversation = async (id, conversationData) => {
  const { data } = await api.put(`/conversations/${id}`, conversationData);
  return data;
};

// Delete a conversation
export const deleteConversation = async (id) => {
  const { data } = await api.delete(`/conversations/${id}`);
  return data;
};

// Send a new prompt to a conversation
export const sendPrompt = async ({ conversationId, promptData }) => {
  const { data } = await api.post(`/queries`, {
    conversation_id: conversationId,
    ...promptData,
  });
  return data;
};
