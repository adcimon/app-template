import argparse
import json
import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

script_dir: str = os.path.dirname(os.path.abspath(__file__))
project_dir: str = os.path.abspath(os.path.join(script_dir, '..'))

args: argparse.Namespace = None

def main() -> None:
	parse_args()

	try:
		print('🏷️ Versioning...')

		version_path = os.path.join(project_dir, 'VERSION')

		with open(version_path, 'r', encoding='utf-8') as file:
			version = file.read().strip()

		backend_pkg = os.path.join(project_dir, 'backend', 'package.json')
		frontend_pkg = os.path.join(project_dir, 'frontend', 'package.json')

		update_json(backend_pkg, version)
		update_json(frontend_pkg, version)

		if args.push:
			push(version)

		print('✅ Success versioning')

	except Exception as e:
		print(f'❌ Failure versioning: {e}')
		sys.exit(1)

def parse_args() -> None:
	description = 'StudioCall version script.\n\nUpdate and synchronize version across the repository.'
	parser = argparse.ArgumentParser(
		description=description,
		formatter_class=argparse.RawTextHelpFormatter
	)

	parser.add_argument('--push', action='store_true', help='Commit, tag and push changes to VCS')

	global args
	args = parser.parse_args()

def update_json(path, version) -> None:
	with open(path, 'r', encoding='utf-8') as file:
		data = json.load(file)

	data['version'] = version

	with open(path, 'w', encoding='utf-8') as file:
		json.dump(data, file, indent='\t')
		file.write('\n')

def push(version: str) -> None:
	is_git = os.path.isdir(os.path.join(project_dir, '.git'))
	is_hg = os.path.isdir(os.path.join(project_dir, '.hg'))

	if is_git:
		run(['git', 'commit', '-am', version])
		run(['git', 'tag', '-a', f'{version}', '-m', version])
		run(['git', 'push'])
		run(['git', 'push', '--tags'])
	elif is_hg:
		run(['hg', 'commit', '-m', version])
		run(['hg', 'tag', f'{version}'])
		run(['hg', 'push'])
	else:
		print('⚠️ No VCS found, skipping push')

def run(cmd: list[str]) -> None:
	print(f"Running: {' '.join(cmd)}")
	result = subprocess.run(cmd, cwd=project_dir, text=True)
	if result.returncode != 0:
		print(f"❌ Failure running: {' '.join(cmd)}")
		sys.exit(1)

if __name__ == '__main__':
	main()
