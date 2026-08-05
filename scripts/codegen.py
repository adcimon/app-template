import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

script_dir: str = os.path.dirname(os.path.abspath(__file__))
project_dir: str = os.path.abspath(os.path.join(script_dir, '..'))

spec_path: str = os.path.join(project_dir, 'backend', 'openapi.json')

targets: list[dict[str, str]] = [
	{
		'target': 'ts',
		'namespace': '',
		'output': os.path.join(project_dir, 'frontend', 'src', 'api', 'api.ts'),
	},
]

def main() -> None:
	for target in targets:
		cmd: list[str] = [
			'python', 'codegen/main.py',
			'--target', target['target'],
			'--spec', spec_path,
			'--namespace', target['namespace'],
			'--output', target['output'],
		]

		try:
			print('📝 Generating models...')
			subprocess.check_call(cmd, cwd=project_dir, shell=True)
			print('✅ Success generating models')
		except subprocess.CalledProcessError as e:
			print(f"❌ Failure generating models: {e}")
			sys.exit(1)

if __name__ == '__main__':
	main()
