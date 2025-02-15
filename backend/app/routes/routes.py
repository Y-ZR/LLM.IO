from fastapi import APIRouter, HTTPException, status
from pydantic import UUID4
from typing import List
from app.models.models import Conversation, ConversationPOST, ConversationPUT, ConversationFull

router = APIRouter()


# Create a new conversation
@router.post("/conversations/", response_model=Conversation, status_code=status.HTTP_201_CREATED)
async def create_conversation(conversation: ConversationPOST):
    new_conversation = Conversation(
        name=conversation.name,
        params=conversation.params,
        tokens=0
    )
    await new_conversation.create()
    return new_conversation


# Get all conversations
@router.get("/conversations/", response_model=List[Conversation])
async def get_conversations():
    conversations = await Conversation.find_all().to_list()
    return conversations


# Get a single conversation
@router.get("/conversations/{id}", response_model=Conversation)
async def get_conversation(id: UUID4):
    conversation = await Conversation.get(id)
    if not conversation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Conversation not found")
    return conversation


# Update a conversation
@router.put("/conversations/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_conversation(id: UUID4, conversation_update: ConversationPUT):
    conversation = await Conversation.get(id)
    if not conversation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Conversation not found")

    await conversation.update({"$set": conversation_update.dict(exclude_unset=True)})
    return


# Delete a conversation
@router.delete("/conversations/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(id: UUID4):
    conversation = await Conversation.get(id)
    if conversation:
        await conversation.delete()
        return
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Conversation not found")
