import argparse
import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

script_dir: str = os.path.dirname(os.path.abspath(__file__))
infra_dir: str = os.path.abspath(os.path.join(script_dir, '..'))
envs_dir: str = os.path.join(infra_dir, 'environments')

args: argparse.Namespace = None

def main() -> None:
	parse_args()

	env_dir = os.path.join(envs_dir, args.environment)

	if not os.path.isdir(env_dir):
		environments = ', '.join(sorted(list_environments()))
		print(f"❌ Failure deploying: Unknown environment '{args.environment}' ({environments})")
		sys.exit(1)

	cmd: list[str] = ['terraform', 'apply']

	if args.auto_approve:
		cmd.append('-auto-approve')

	try:
		print('🚀 Deploying...')
		subprocess.check_call(cmd, cwd=env_dir, shell=True)
		print('✅ Success deploying')
	except subprocess.CalledProcessError as e:
		print(f'❌ Failure deploying: {e}')
		sys.exit(1)

def parse_args() -> None:
	description = 'StudioCall infrastructure deploy script.'
	parser = argparse.ArgumentParser(
		description=description,
		formatter_class=argparse.RawTextHelpFormatter
	)

	parser.add_argument('--environment', help='Environment name')
	parser.add_argument('--auto-approve', action='store_true', help='Skip interactive approval')

	global args
	args = parser.parse_args()

def list_environments() -> list[str]:
	if not os.path.isdir(envs_dir):
		return []
	return [
		name for name in os.listdir(envs_dir)
		if os.path.isdir(os.path.join(envs_dir, name))
	]

if __name__ == '__main__':
	main()
