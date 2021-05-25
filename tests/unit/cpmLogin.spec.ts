import { shallowMount, VueWrapper } from '@vue/test-utils'
import Login from '@/components/login/Login.vue'
import { IUser } from '@/types/IChatService'


describe('Login.vue', () => {
    function build() {
        const service = { entrar: jest.fn() };
        const user: IUser = { id: "123", nome: "teste" };
        service.entrar.mockReturnValue(user);

        const wrapper = shallowMount(Login, {
            global: {
                provide: {
                    'chatService': service
                }
            }
        })
        return {
            wrapper,
            textbox: wrapper.get("[data-teste='nome-usuario']"),
            title: wrapper.get('h1'),
            loginButton: wrapper.get("[data-test='btn-entrar']"),
            service,
        }
    }

    it('inicia deslogado', () => {
        // Arrange Act
        const { title } = build();

        // Assert
        expect(title.text()).toEqual('')
    })

    it('ao clicar no botão de login, exibe nome do usuário', async () => {
        // Arrange
        const { textbox, loginButton, service } = build();
        textbox.setValue("teste");

        // Act
        await loginButton.trigger('click');

        // Assert
        expect(service.entrar).toHaveBeenCalledTimes(1);
    })

    it('ao enviar um nome invalido, deve não entrar', async () => {
        // Arrange
        const { textbox, wrapper, loginButton } = build();
        const errorMessage = wrapper.get("[data-teste='error-message']");
        textbox.setValue("");

        // Act
        await loginButton.trigger('click');

        // Assert
        expect(errorMessage.text() === "").toBeFalsy();
    })
})
