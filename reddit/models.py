from django.db import models

# Create your models here.
class Post(models.Model):
    created_at = models.DateField()
    title = models.CharField(max_length=100)
    picture = models.TextField()
    content = models.TextField(max_length=40000)
    site_url = models.TextField()
    vote_total = models.PositiveIntegerField()
    
    def __str__(self):
        return self.title

class Comment(models.Model):
    created_at = models.DateField()
    content = models.TextField(max_length=40000)
    vote_total = models.PositiveIntegerField()
    post = models.ForeignKey(Post,on_delete = models.CASCADE, related_name ='comments')

    def __str__(self):
        return int(self.created_at)
