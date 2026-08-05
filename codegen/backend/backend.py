from __future__ import annotations

import ir
from backend import emitter
from backend import typescript

emitters: dict[str, type[emitter.Emitter]] = {
	cls.key(): cls for cls in ([typescript.TypeScriptEmitter])
}

def get_emitter_class(target: str) -> type[emitter.Emitter]:
	if target not in emitters:
		raise ValueError(f"Unknown target: '{target}'")
	return emitters[target]

def get_emitter(target: str, config: emitter.EmitterConfig | None = None) -> emitter.Emitter:
	return get_emitter_class(target)(config)

def targets() -> list[str]:
	return list(emitters)

def filename(target: str) -> str:
	return get_emitter_class(target).filename()

def emit(target: str, spec: ir.Spec, config: emitter.EmitterConfig | None = None) -> str:
	return get_emitter(target, config).emit(spec)
