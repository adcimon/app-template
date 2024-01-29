import sys
import os
import subprocess

def main():
	abspath = os.path.abspath(sys.argv[0])
	dirname = os.path.dirname(abspath)
	cwd = dirname + '/../'
	subprocess.call('npm install -g @nestjs/cli', cwd=cwd, shell=True)
	subprocess.call('npm install', cwd=cwd, shell=True)

if __name__ == '__main__':
	main()
