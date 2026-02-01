from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from models.finance_task import FinanceTask, FinanceTaskCreate
from core.database import get_db


class TaskService:
    def __init__(self, session: Session):
        self.session = session

    def create_task(self, task_create: FinanceTaskCreate) -> FinanceTask:
        """Create a new finance task"""
        try:
            task = FinanceTask(
                user_id=task_create.user_id,
                title=task_create.title,
                description=task_create.description,
                category=task_create.category,
                amount=task_create.amount,
                due_date=task_create.due_date,
                completed=False
            )
            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
            return task
        except Exception as e:
            self.session.rollback()
            raise e

    def list_tasks(
        self,
        user_id: str,
        status: Optional[str] = "all",
        category: Optional[str] = None
    ) -> List[FinanceTask]:
        """List finance tasks with optional filtering"""
        query = self.session.query(FinanceTask).filter(FinanceTask.user_id == user_id)

        if status == "pending":
            query = query.filter(FinanceTask.completed == False)
        elif status == "completed":
            query = query.filter(FinanceTask.completed == True)

        if category:
            query = query.filter(FinanceTask.category == category)

        return query.all()

    def update_task(self, user_id: str, task_id: int, task_update: dict) -> Optional[FinanceTask]:
        """Update a finance task"""
        try:
            task = self.session.query(FinanceTask).filter(
                and_(FinanceTask.id == task_id, FinanceTask.user_id == user_id)
            ).first()

            if not task:
                return None

            for key, value in task_update.items():
                setattr(task, key, value)

            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
            return task
        except Exception as e:
            self.session.rollback()
            raise e

    def complete_task(self, user_id: str, task_id: int) -> Optional[FinanceTask]:
        """Mark a finance task as completed"""
        try:
            task = self.session.query(FinanceTask).filter(
                and_(FinanceTask.id == task_id, FinanceTask.user_id == user_id)
            ).first()

            if not task:
                return None

            task.completed = True
            self.session.add(task)
            self.session.commit()
            self.session.refresh(task)
            return task
        except Exception as e:
            self.session.rollback()
            raise e

    def delete_task(self, user_id: str, task_id: int) -> bool:
        """Delete a finance task"""
        try:
            task = self.session.query(FinanceTask).filter(
                and_(FinanceTask.id == task_id, FinanceTask.user_id == user_id)
            ).first()

            if not task:
                return False

            self.session.delete(task)
            self.session.commit()
            return True
        except Exception as e:
            self.session.rollback()
            raise e