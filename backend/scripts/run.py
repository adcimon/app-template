import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

script_dir: str = os.path.dirname(os.path.abspath(__file__))
project_dir: str = os.path.abspath(os.path.join(script_dir, '..'))

def main() -> None:
	cmd: list[str] = ['npm', 'run', 'start:dev']

	try:
		print('🚀 Running...')
		subprocess.check_call(cmd, cwd=project_dir, shell=True)
		print('✅ Success running')
	except subprocess.CalledProcessError as e:
		print(f'❌ Failure running: {e}')
		sys.exit(1)

if __name__ == '__main__':
	main()
