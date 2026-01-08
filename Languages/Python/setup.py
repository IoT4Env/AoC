from setuptools import find_packages, setup


with open('./app/readme.md', 'r+') as documentation:
	long_description = documentation.read()

setup(
	name='fshandler',
	version='0.0.1',
	description='A package to reduce boilerplate code for file management.',
	package_dir={"": "app"},
	packages=find_packages(where="app"),
	long_description=long_description,
	long_description_content_type='text/markdown',
	author="IoT4Env",
	license='MIT',
)
