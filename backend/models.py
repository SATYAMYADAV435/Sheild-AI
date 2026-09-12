from sqlalchemy import Column, Integer, String, DateTime, Text, Enum, Float
from sqlalchemy.sql import func
import enum

from backend.database import Base


class ThreatSeverity(str, enum.Enum):
    """Threat severity levels"""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


class ThreatStatus(str, enum.Enum):
    """Threat status"""
    DETECTED = "detected"
    ANALYZING = "analyzing"
    MITIGATED = "mitigated"
    RESOLVED = "resolved"
    FALSE_POSITIVE = "false_positive"


class Threat(Base):
    """Threat detection model"""
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True)
    threat_type = Column(String(100), nullable=False, index=True)
    severity = Column(Enum(ThreatSeverity), nullable=False, default=ThreatSeverity.MEDIUM)
    status = Column(Enum(ThreatStatus), nullable=False, default=ThreatStatus.DETECTED)
    source_ip = Column(String(45), nullable=True, index=True)
    destination_ip = Column(String(45), nullable=True)
    description = Column(Text, nullable=False)
    ai_analysis = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)
    detected_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    mitigation_action = Column(Text, nullable=True)

    def __repr__(self):
        return f"<Threat(id={self.id}, type={self.threat_type}, severity={self.severity})>"
