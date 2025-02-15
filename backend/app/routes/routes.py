from fastapi import APIRouter, HTTPException, status
from pydantic import UUID4
from typing import List
from app.models.models import QueryRoleType, Prompt, ConversationPOST, ConversationPUT, ConversationFull

router = APIRouter()


# Create a new conversation
@router.post("/conversations/", response_model=ConversationFull, status_code=status.HTTP_201_CREATED)
async def create_conversation(conversation: ConversationPOST):
    new_conversation = ConversationFull(
        name=conversation.name,
        params=conversation.params,
        tokens=0,
        messages=[]
    )
    await new_conversation.create()
    return new_conversation


# Get all conversations
@router.get("/conversations/", response_model=List[ConversationFull])
async def get_conversations():
    conversations = await ConversationFull.find_all().to_list()
    return conversations


# Get a single conversation
@router.get("/conversations/{id}", response_model=ConversationFull)
async def get_conversation(id: UUID4):
    conversation = await ConversationFull.get(id)
    if not conversation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Conversation not found")
    return conversation


# Update a conversation
@router.put("/conversations/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_conversation(id: UUID4, conversation_update: ConversationPUT):
    conversation = await ConversationFull.get(id)
    if not conversation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Conversation not found")

    await conversation.update({"$set": conversation_update.dict(exclude_unset=True)})
    return


# Delete a conversation
@router.delete("/conversations/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(id: UUID4):
    conversation = await ConversationFull.get(id)
    if conversation:
        await conversation.delete()
        return
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Conversation not found")


# Add a prompt to a conversation
@router.post("/queries", response_model=UUID4, status_code=status.HTTP_201_CREATED)
async def create_prompt(id: UUID4, prompt: Prompt):
    conversation = await ConversationFull.get(id)
    if not conversation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Conversation not found")

    conversation.messages.append(prompt)

    try:
        # send prompt to LLM model
        response = "response from LLM"
        # append LLM response to conversation.messages
        llm_response = Prompt(
            role=QueryRoleType.ASSISTANT, content=response)
        conversation.messages.append(llm_response)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

    await conversation.save()

    return conversation.id
