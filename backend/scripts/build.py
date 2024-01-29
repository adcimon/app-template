import sys
import os
import subprocess

def main():
	abspath = os.path.abspath(sys.argv[0])
	dirname = os.path.dirname(abspath)
	cwd = dirname + '/../'
	subprocess.call('npm run build', cwd=cwd, shell=True)

if __name__ == '__main__':
	main()
