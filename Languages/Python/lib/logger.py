# built-in modules
import logging
from logging import Logger


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def get_logger(name) -> Logger:
	return logging.getLogger(name)
