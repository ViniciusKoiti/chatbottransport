from abc import ABC, abstractmethod
from app.models.widget import WidgetSettings


class WidgetConfigRepository(ABC):
    @abstractmethod
    def get(self, tenant_id: str, bot_id: str) -> WidgetSettings | None: ...

    @abstractmethod
    def save(self, tenant_id: str, bot_id: str, settings: WidgetSettings) -> None: ...


class InMemoryWidgetConfigRepository(WidgetConfigRepository):
    def __init__(self) -> None:
        self._store: dict[tuple[str, str], WidgetSettings] = {}

    def get(self, tenant_id: str, bot_id: str) -> WidgetSettings | None:
        return self._store.get((tenant_id, bot_id))

    def save(self, tenant_id: str, bot_id: str, settings: WidgetSettings) -> None:
        self._store[(tenant_id, bot_id)] = settings


widget_config_repo = InMemoryWidgetConfigRepository()
