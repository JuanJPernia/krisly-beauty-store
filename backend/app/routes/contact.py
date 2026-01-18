"""
Contact Routes
Rutas para gestionar mensajes de contacto
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import ContactMessage
from ..schemas import ContactMessageCreate, ContactMessageResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=ContactMessageResponse)
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    """Crear un nuevo mensaje de contacto"""
    
    # Validar que los campos no estén vacíos
    if not message.name or not message.email or not message.subject or not message.message:
        raise HTTPException(status_code=400, detail="Todos los campos son requeridos")
    
    # Crear el mensaje
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message
    )
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message

@router.get("/", response_model=list[ContactMessageResponse])
def get_contact_messages(db: Session = Depends(get_db)):
    """Obtener todos los mensajes de contacto (solo admin)"""
    messages = db.query(ContactMessage).all()
    return messages

@router.get("/{message_id}", response_model=ContactMessageResponse)
def get_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Obtener un mensaje de contacto por ID"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    
    if not message:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    
    return message

@router.delete("/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Eliminar un mensaje de contacto"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    
    if not message:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    
    db.delete(message)
    db.commit()
    
    return {"message": "Mensaje eliminado"}
