<template>
    <div class="footer">
        <div class="container">
            <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5">
                <div class="col mb-3">
                    <router-link to="/home" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                        <img class="logo" src="../../public/image/oh_my_logo_white.svg" alt="">
                    </router-link>
                    <p class="copy-right text-light mt-2">Copyright © 2024 Aida Wu. All Rights Reserved.</p>
                </div>
                <div class="col mb-3">
                    <ul class="nav flex-column">
                        <li class="nav-item info"><font-awesome-icon class="bars me-2" icon="fas fa-house"/>太陽市果蔬區健康路1號</li>
                        <li class="nav-item info"><font-awesome-icon class="bars me-2" icon="fas fa-phone"/>(02)1234-5678</li>
                        <li class="nav-item info"><font-awesome-icon class="bars me-2" icon="fas fa-envelope"/>ada10050616@gmail.com</li>
                    </ul>
                </div>
                <div class="col mb-3">
                    <ul class="nav flex-column">
                        <li class="nav-item border-bottom border-secondary-subtle"><router-link class="nav-link p-0" to="/items">全部商品</router-link></li>
                        <li class="nav-item"><a href="#" class="nav-link p-0">手工啤酒系列</a></li>
                        <li class="nav-item"><a href="#" class="nav-link p-0">醃漬食品系列</a></li>
                        <li class="nav-item"><a href="#" class="nav-link p-0">健康小食系列</a></li>
                        <li class="nav-item"><a href="#" class="nav-link p-0">有機蔬果系列</a></li>
                    </ul>
                </div>
                <div class="col mb-3">
                    <ul class="nav flex-column">
                        <li class="nav-item border-bottom border-secondary-subtle"><router-link href="#" class="nav-link p-0" to="/about">關於我們</router-link></li>
                        <li class="nav-item border-bottom border-secondary-subtle"><a href="#" class="nav-link p-0">最新消息</a></li>
                        <li class="nav-item border-bottom border-secondary-subtle"><a href="#" class="nav-link p-0">營利事業登記</a></li>
                        <li class="nav-item border-bottom border-secondary-subtle"><a href="#" class="nav-link p-0">版權聲明</a></li>
                    </ul>
                </div>
                <div class="col mb-3">
                    <ul class="nav flex-column">
                        <li class="nav-item p-0"><a href="#" class="nav-link call-to-action mb-3">聯繫我們<font-awesome-icon class="bars" icon="fas fa-arrow-right"/></a></li>
                        <li class="nav-item p-0"><router-link class="nav-link call-to-action mb-3" to="/login">管理員登入<font-awesome-icon class="bars" icon="fas fa-arrow-right"/></router-link></li>
                    </ul>
                </div>
            </footer>
        </div>
    </div>
</template>
