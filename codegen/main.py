from __future__ import annotations

import argparse
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

script_dir: str = os.path.dirname(os.path.abspath(__file__))

if script_dir not in sys.path:
	sys.path.insert(0, script_dir)

import ir
import frontend
import backend

args: argparse.Namespace = None

default_spec_path: str = os.path.join(script_dir, 'openapi.json')
default_dist_dir: str = os.path.join(script_dir, 'dist')

def main() -> None:
	parse_args()

	try:
		print(f'📝 Generating {args.target} models from {args.spec}...')

		spec: ir.Spec = frontend.parse(args.spec)

		config: backend.EmitterConfig = backend.EmitterConfig(namespace=args.namespace)

		content: str = backend.emit(args.target, spec, config)

		output_path: str = args.output or os.path.join(default_dist_dir, backend.filename(args.target))
		if not args.output:
			os.makedirs(default_dist_dir, exist_ok=True)

		with open(output_path, 'w', encoding='utf-8') as file:
			file.write(content)

		print(f'✅ Success generating {args.target} models at: {output_path}')
	except Exception as e:
		print(f'❌ Failure generating {args.target} models: {e}')
		sys.exit(1)

def parse_args() -> None:
	parser = argparse.ArgumentParser(description='Generate typed models from an OpenAPI spec.')

	parser.add_argument('--target', required=True, choices=backend.targets(), help='Output language.')
	parser.add_argument('--spec', default=default_spec_path, help='Path to OpenAPI JSON file.')
	parser.add_argument('--namespace', help='Namespace or package for targets that support it.')
	parser.add_argument('--output', help='Output path.')

	global args
	args = parser.parse_args()

if __name__ == '__main__':
	main()
