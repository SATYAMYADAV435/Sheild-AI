from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

from backend.models import ThreatSeverity, ThreatStatus


class ThreatBase(BaseModel):
    """Base threat schema"""
    threat_type: str = Field(..., min_length=1, max_length=100)
    severity: ThreatSeverity
    source_ip: Optional[str] = Field(None, max_length=45)
    destination_ip: Optional[str] = Field(None, max_length=45)
    description: str = Field(..., min_length=1)
    confidence_score: Optional[float] = Field(None, ge=0.0, le=1.0)


class ThreatCreate(ThreatBase):
    """Schema for creating a threat"""
    pass


class ThreatUpdate(BaseModel):
    """Schema for updating a threat"""
    status: Optional[ThreatStatus] = None
    ai_analysis: Optional[str] = None
    mitigation_action: Optional[str] = None
    resolved_at: Optional[datetime] = None


class ThreatResponse(ThreatBase):
    """Schema for threat response"""
    id: int
    status: ThreatStatus
    ai_analysis: Optional[str] = None
    detected_at: datetime
    updated_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    mitigation_action: Optional[str] = None

    class Config:
        from_attributes = True
