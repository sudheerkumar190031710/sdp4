# Generated by Django 4.0.4 on 2022-05-13 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renew', '0002_alter_post_brand_alter_post_condition_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='img',
            field=models.ImageField(default='def.jpg', upload_to='post/'),
        ),
    ]
