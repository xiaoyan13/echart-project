<template>
    <div class="tile">
        <div class="intro">
            <div class="title">
                <img src="https://avatars.githubusercontent.com/u/90735179?v=4" alt="" />
                <h1>xiaoyan13</h1>
            </div>
            <div class="todolist">
                <h3 style="margin-bottom: 10px">Now status</h3>
                <span>首页</span><el-progress :percentage="65.5" color="#42b983" />
                <span>代办列表</span><el-progress :percentage="10.5" color="#f1e05a" />
                <span>其它页面规划</span><el-progress :percentage="5.5" />
            </div>
        </div>
        <div class="text">
            <h3 class="animate-text">
                查看本网址的源码 - <a href="/xiaoyan13">Github</a>
            </h3>
            <h3 class="animate-text">
                markdown 笔记角落 - <a href="https://www.iflowers.site/" target="_blank">Iflower</a>
            </h3>
        </div>
    </div>
</template>

<style scoped lang="less">
.tile {
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    transition: all 0.4s ease-out;

    &:hover .intro {
        opacity: 0.1;
    }

    &:hover .animate-text {
        transform: translateX(0);
        opacity: 1;
    }

    &:hover span {
        opacity: 1;
        transform: translateY(0px);
    }

    .intro {
        width: 100%;
        position: absolute;
        transition: all 0.4s ease-out;

        .title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            margin-left: 10px;
            font-weight: 300;
            text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        }

        span {
            font-size: 14px;
            color: #606266;
        }
    }

    .text {
        z-index: 99;
        position: absolute;
        padding: 20px;
        height: 100%;

        h2 {
            font-weight: 100;
            font-style: italic;
            transform: translateX(200px);
        }

        p {
            font-weight: 300;
            margin-top: 20px;
            line-height: 25px;
            transform: translateX(-200px);
            transition-delay: 0.2s;
        }

        a {
            display: inline-block;
            margin: 20px 0;
            position: relative;
            color: #1155cb;
            font-family: 'Futura';
            font-weight: 500;
            text-decoration: none;
            font-size: 22px;
            z-index: 2;
            transition: 0.2s ease-in-out;

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 80px;
                left: 0;
                bottom: -45px;
                z-index: -1;
                transform: scaleX(0);
                transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1);
                transform-origin: right;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B stroke:%23e0ff00; stroke-width:2; stroke-linecap:square; %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 40 Q 20 40 40 40 Q 60 40 80 40' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E") 0px 50%/80px 80px repeat-x;
            }

            &:hover {
                color: #c2ff00;
            }

            &:hover:before {
                transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform-origin: left;
                -webkit-animation: waving 3s linear infinite;
                animation: waving 3s linear infinite;
                transform: scaleX(1);
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B animation:wave 2s linear infinite; animation-delay:0s; stroke:%23e0ff00; stroke-width:2; stroke-dashoffset:0px; stroke-dasharray:80px; stroke-linecap:round; fill:%231155cb; %7D @keyframes wave%7B 25%25%7B stroke-dashoffset:-80px; %7D 50%25%7B stroke-dashoffset:-80px; %7D 100%25%7B stroke-dashoffset:-160px; %7D %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath class='wave' d='M 0 40 L 50 40 L 80 40 L 54 44 L 54 36 L 80 40 ' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E") calc(100% - 10px) 50%/40px 80px no-repeat,
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B stroke:%23e0ff00; stroke-width:2; stroke-linecap:round; %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 40 Q 20 40 40 40 Q 60 40 80 40' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E") 0px 50% / calc(100% - 25px) 80px no-repeat;
                animation: none;
            }
        }
    }
}

img {
    vertical-align: middle;
    width: 80px;
    border-radius: 50%;
}

.animate-text {
    opacity: 0;
    transition: all 0.6s ease-in-out;
}

@-webkit-keyframes waving {
    to {
        background-position: 80px 50%, 160px 50%;
    }
}

@keyframes waving {
    to {
        background-position: 80px 50%, 160px 50%;
    }
}
</style>