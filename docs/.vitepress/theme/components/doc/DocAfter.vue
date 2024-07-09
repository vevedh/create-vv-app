<script setup lang="ts">
import { useData } from 'vitepress'
import useAuthors from '../../composables/useAuthors'

const { site } = useData()

const { currentAuthor: author, path, prevAuthor, nextAuthor } = useAuthors()
</script>

<template>
    <div>
        Suivant ->
    </div>
</template>