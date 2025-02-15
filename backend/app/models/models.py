from pydantic import BaseModel, Field, constr, conint, UUID4
from typing import List, Dict, Any
from enum import Enum
from uuid import uuid4
from beanie import Document


class QueryRoleType(str, Enum):
    """
    Chat roles for each individual message
    """
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"
    FUNCTION = "function"


class Prompt(BaseModel):
    """
    Prompt interaction structure
    """
    role: QueryRoleType
    content: constr(min_length=1) = Field(...,
                                          description="This is the prompt content of the message")


class Conversation(Document):
    """
    Representation of a series of interactions with a particular LLM
    """
    id: UUID4 = Field(default_factory=lambda: uuid4(),
                      description="Unique identifier for the conversation", readOnly=True)
    name: constr(max_length=200) = Field(...,
                                         description="Title of the conversation")
    params: Dict[str, Any] = Field(...,
                                   default_factory=dict, description="Parameter dictionary for overriding defaults prescribed by the AI Model")
    tokens: conint(ge=0) = Field(...,
                                 description="Total number of tokens consumed in this entire Chat (Format: int32)", readOnly=True)

    class Settings:
        collection = "conversations"


class ConversationFull(Conversation):
    """
    Extends Conversation to include a list of messages
    """
    messages: List[Prompt] = Field(...,
                                   description="Chat messages to be included")


class ConversationPOST(BaseModel):
    """
    POST request for creating a new Chat
    """
    name: constr(max_length=200) = Field(...,
                                         description="Title of the conversation")
    model: str = Field(..., description="Model identifier")
    params: Dict[str, Any] = Field(
        default_factory=dict, description="Parameter dictionary for overriding defaults prescribed by the AI Model")


class ConversationPUT(BaseModel):
    """
    PUT request for modifying a Chat
    """
    name: constr(max_length=200) = Field(...,
                                         description="Title of the conversation")
    params: Dict[str, Any] = Field(
        default_factory=dict, description="Parameter dictionary for overriding defaults prescribed by the AI Model")
