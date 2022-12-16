# reikai-log

#logから#activeにメッセージを転送

例会で使用する

## Build / Format

```bash
$ cp .env.sample .env
$ yarn install
$ yarn prepare
$ yarn build            # or yarn build:production; Build
$ yarn lint:fix         # Lint & Format
```

## Slack botの設定

`.env` ファイルに必要なトークンを記載する (`.env.sample` を参照)

Slack botのApp Manifestは以下の通り

```json
{
    "display_information": {
        "name": "例会ログ",
        "description": "例会のログ",
        "background_color": "#044024"
    },
    "features": {
        "bot_user": {
            "display_name": "reikai-log",
            "always_online": true
        }
    },
    "oauth_config": {
        "scopes": {
            "user": [
                "channels:history"
            ],
            "bot": [
                "chat:write",
                "chat:write.public",
                "chat:write.customize"
            ]
        }
    },
    "settings": {
        "event_subscriptions": {
            "user_events": [
                "message.channels"
            ]
        },
        "interactivity": {
            "is_enabled": true
        },
        "org_deploy_enabled": false,
        "socket_mode_enabled": true,
        "token_rotation_enabled": false
    }
}
```
