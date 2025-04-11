# utils.py
def user_directory_path(instance, filename):
    # instance will be a Hotel object (or whatever model holds the logo)
    return 'user_{0}/{1}'.format(instance.user.id, filename)
