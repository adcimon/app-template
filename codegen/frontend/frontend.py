from __future__ import annotations

import ir
from frontend import parser

def parse(spec_path: str) -> ir.Spec:
	spec: ir.Spec = parser.parse(spec_path)
	return spec
