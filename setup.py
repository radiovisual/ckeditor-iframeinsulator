# Always prefer setuptools over distutils
from setuptools import setup

setup (
    name='ckeditor-iframeinsulator',
    version='0.0.1',
    description='Insulate ckeditor iframes with a contextMenu-friendly div.',
    author='Michael Wuergler',
    author_email='senjudev@gmail.com',
    url='https://github.com/radiovisual/ckeditor-iframeinsulator',
    long_description='This plugin works as a simple embed plugin, with a twist: it wraps all iframe embeds with a div tag. This means that even iframes that hijack the right-click can have ckeditor contextMenus attached to them.',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: POSIX',
        'Programming Language :: JavaScript',
        'Topic :: Software Development :: Libraries',
    ],
    zip_safe=False
)